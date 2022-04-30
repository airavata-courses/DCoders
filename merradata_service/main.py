from fastapi import FastAPI, HTTPException
import numpy as np
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import os
import netCDF4
import base64
import numpy as np
import pandas as pd
import imageio
import requests # get the requsts library from https://github.com/requests/requests
import uvicorn
import json
from multiprocessing import connection
import pika
from netCDF4 import Dataset


app = FastAPI(title="Merra-api")

print("This is python code")

#credentials = pika.PlainCredentials(username='guest', password='guest')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='127.0.0.1')
)

print("Before connection channel")


class SessionWithHeaderRedirection(requests.Session):

    AUTH_HOST = 'urs.earthdata.nasa.gov'

    def __init__(self, username, password):

        super().__init__()

        self.auth = (username, password)

    # Overrides from the library to keep headers when redirected to or from

    # the NASA auth host.

    def rebuild_auth(self, prepared_request, response):

        headers = prepared_request.headers
        url = prepared_request.url
        if 'Authorization' in headers:
            original_parsed = requests.utils.urlparse(response.request.url)
            redirect_parsed = requests.utils.urlparse(url)
            if (original_parsed.hostname != redirect_parsed.hostname) and \
                    redirect_parsed.hostname != self.AUTH_HOST and \
                    original_parsed.hostname != self.AUTH_HOST:
                del headers['Authorization']
        return



@app.get("/api/merra/{year}/{month}")
def merra_data(year, month):

    username = "cdeshpa"

    password= "Dcoders_ads2022"

    session = SessionWithHeaderRedirection(username, password)

    # the url of the file we wish to retrieve

    url = "https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2_MONTHLY/M2TMNXSLV.5.12.4/"+year+"/MERRA2_400.tavgM_2d_slv_Nx."+year+month+".nc4"
    print(url)
    # extract the filename from the url to be used when saving the file

    filename = url[url.rfind('/')+1:]  

    try:

        response = session.get(url, stream=True)

        print(response.status_code)
        # raise an exception in case of http errors

        response.raise_for_status()  
        # save the file

        with open(filename, 'wb') as fd:

            for chunk in response.iter_content(chunk_size=1024*1024):

                fd.write(chunk)

    except requests.exceptions.HTTPError as e:

        # handle any errors here

        print(e)

    data = Dataset(filename, mode='r')
    lons = data.variables['lon'][:]
    lats = data.variables['lat'][:]

    T2M = data.variables['T2M'][:,:,:]

    T2M = T2M[0,:,:]

    # Set the figure size, projection, and extent
    fig = plt.figure(figsize=(8,4))
    ax = plt.axes(projection=ccrs.Robinson())
    ax.set_global()
    ax.coastlines(resolution="110m",linewidth=1)
    ax.gridlines(linestyle='--',color='black')

    # Set contour levels, then draw the plot and a colorbar
    clevs = np.arange(230,311,5)
    plt.contourf(lons, lats, T2M, clevs, transform=ccrs.PlateCarree(),cmap=plt.cm.jet)
    plt.title('MERRA-2 Air Temperature', size=14)
    cb = plt.colorbar(ax=ax, orientation="vertical", pad=0.02, aspect=16, shrink=0.8)
    cb.set_label('K',size=12,rotation=0,labelpad=15)
    cb.ax.tick_params(labelsize=10)

    img64 = 'MERRA2_t2m'+year+month+'.png'

    fig.savefig(img64, format='png', dpi=360)

    cur_dir = os.getcwd()
    image = os.path.join(cur_dir, img64)

    json_object = {}
    with open(image, 'rb') as output:
        encoded_image = base64.b64encode(output.read())
        json_object = {
        "year":year,
        "month":month,    
        "encoded_image": encoded_image
        }

    nc = netCDF4.Dataset(filename, mode='r')
    cols = list(nc.variables.keys())
    list_nc = []
    for c in cols:
        list_nc.append(list(nc.variables[c][:]))
    df_nc = pd.DataFrame(list_nc)
    df_nc = df_nc.T
    df_nc.columns = cols
    df_nc.to_csv("cloud"+year+month+".csv", index = False)

    return json_object

global store
store = ""
def callback(ch, method, properties, body):
    print("Message received successfully")
    data = body.decode("utf-8")
    data = json.loads(data)
    store = merra_data(data["year"],data["month"])
    print(store)
    #store = store.decode("utf-8")
    #print(type(store))
    #
    store["encoded_image"] = store["encoded_image"].decode("utf-8")
    store = json.dumps(store)
    channel_return = connection.channel()
    channel_return.queue_declare(queue='Meerareturn')
    channel_return.basic_publish(exchange='', routing_key='Meerareturn', body=store)
    channel_return.close()


channel = connection.channel()
channel.queue_declare(queue='Meera')

channel.basic_consume(
    queue='Meera', on_message_callback=callback, auto_ack=True
)
    
print("Consumerism")

channel.start_consuming()



def start():
#     Start fastAPI using uvicorn 
    uvicorn.run("main:app", port=8000, host="127.0.0.1")

