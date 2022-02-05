""" Pytest for the GET datasource_api { TODO: Mock the nexrad object so that it doesn't download the radar object for the unit
testing } """

from fastapi.testclient import TestClient

from datasource_api.main import app

test_client = TestClient(app)


def test_nexrad_data():
    """ Test GET datasource_api """
    response = test_client.get('/datasource_api/v1/2013/05/31/KTLX')
    assert response.status_code == 200
