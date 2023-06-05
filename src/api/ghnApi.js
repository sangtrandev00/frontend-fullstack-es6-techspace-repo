import ghnClient from "./ghnClient";

const ghnTokenApi = "66961f68-cc3c-11ed-943b-f6b926345ef9";

class GhnApi {
  static getProvinces() {
    const url = "/master-data/province";

    return ghnClient.get(url, {
      headers: {
        Token: ghnTokenApi,
      },
    });
  }

  static getProvinceById() {}

  static getDistricts(data) {
    const url = `/master-data/district`;

    // data: {
    //     "province_id": 201
    // }

    return ghnClient.post(url, data, {
      headers: {
        Token: ghnTokenApi,
      },
    });
  }

  static getWards(district_id) {
    const url = `/master-data/ward?district_id=${district_id}`;
    return ghnClient.get(url, {
      headers: {
        Token: ghnTokenApi,
      },
    });
  }
}

export default GhnApi;
