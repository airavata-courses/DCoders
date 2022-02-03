from fastapi.testclient import TestClient

from datasource_service.main import app

test_client = TestClient(app)


def test_nexrad_data():
    response = test_client.get('/api/v1/2013/05/31/KTLX')
    assert response.status_code == 200
