""" Microservice to fetch nexrad data from aws s3 """

import os

from fastapi import FastAPI, Response
import nexradaws
import uvicorn
import pyart
from matplotlib import pyplot as plt
import base64

desc = """ ### Datasource api helps you fetch the radar object from a specified radar station \n
           API uses a Py-ART library, an open source library developed by
           - JJ Helmus and SM Collis, JORS 2016, doi: 10.5334/jors.119     
       """

app = FastAPI(title="Datasource-api",
              description=desc)


@app.get("/api/v1/{year}/{month}/{day}/{radar}")
def nexrad_data(year: int, month: int, day: int, radar: str):
    """ GET api to fetch data from nexradaws """

    radar_object, scans = download_radar_object(year, month, day, radar)
    encoded_image = ""
    # radar_object = pyart.io.read_nexrad_archive(file_path)
    # plot_radar = pyart.graph.RadarDisplay(radar_object)
    try:
        radar_file = scans[-1].filename.rstrip('.gz')
        for i, scan in enumerate(radar_object.iter_success(), start=1):
            radar = scan.open_pyart()
            display_plot = pyart.graph.RadarDisplay(radar)
            # Set backend to non-interactive when using the matplotlib to plot inside a thread which is not called
            # from main() method so that your server does not try to create and then destroy. (
            # https://github.com/matplotlib/matplotlib/issues/14304/)
            plt.switch_backend('Agg')
            display_plot.plot('reflectivity', 0, title="{} {}".format(scan.radar_id, scan.scan_time))
            display_plot.set_limits((-150, 150), (-150, 150))
            save_plot = radar_file + '-' + 'plot'
            plt.savefig(save_plot, format='png')
            cur_dir = os.getcwd()
            image = os.path.join(cur_dir, save_plot)
            with open(image, 'rb') as output:
                encoded_image = base64.b64encode(output.read())
        return Response(content=encoded_image, media_type="application/json")
    except Exception as ex:
        print("Error while fetching the data of plotting the graph")
        print(ex)
    finally:
        dirs = os.listdir()
        cur_dir = os.getcwd()
        for file in dirs:
            file_path = os.path.join(cur_dir, file)
            if file.endswith('.gz'):
                os.remove(file_path)
            if file.endswith('.png'):
                os.remove(file_path)
            if file.endswith('plot'):
                os.remove(file_path)


def download_radar_object(year: int, month: int, day: int, radar: str):
    """ Downloading the radar object """

    # nexradaws connection object
    ncon = nexradaws.NexradAwsInterface()
    scans = ncon.get_avail_scans(year, month, day, radar)
    download_dir = os.getcwd()
    radar_object = ncon.download(scans[:1], download_dir)
    return radar_object, scans


def start():
    uvicorn.run("datasource_service.main:app", port=8000, host="0.0.0.0")
