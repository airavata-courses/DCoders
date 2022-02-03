import os

from fastapi import FastAPI
import nexradaws
import uvicorn
import pyart
from matplotlib import pyplot as plt
import base64

app = FastAPI()


@app.get("/api/v1/{year}/{month}/{day}/{radar}")
def nexrad_data(year: int, month: int, day: int, radar: str):
    radar_object, scans = download_radar_object(year, month, day, radar)
    encoded_image = ""
    # radar_object = pyart.io.read_nexrad_archive(file_path)
    # plot_radar = pyart.graph.RadarDisplay(radar_object)
    try:
        radar_file = scans[-1].filename.rstrip('.gz')
        for i, scan in enumerate(radar_object.iter_success(), start=1):
            radar = scan.open_pyart()
            display_plot = pyart.graph.RadarDisplay(radar)
            display_plot.plot('reflectivity', 0, title="{} {}".format(scan.radar_id, scan.scan_time))
            display_plot.set_limits((-150, 150), (-150, 150))
            save_plot = radar_file + '-' + 'plot'
            plt.savefig(save_plot, format='png')
            cur_dir = os.getcwd()
            image = os.path.join(cur_dir, save_plot)
            with open(image, 'rb') as output:
                encoded_image = base64.b64encode(output.read())
        return encoded_image
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


def download_radar_object(year: int, month: int, day: int, radar: str):
    # nexradaws connection object
    ncon = nexradaws.NexradAwsInterface()
    scans = ncon.get_avail_scans(year, month, day, radar)
    download_dir = os.getcwd()
    radar_object = ncon.download(scans[:1], download_dir)
    return radar_object, scans


def start():
    uvicorn.run("datasource_service.main:app", reload=True)
