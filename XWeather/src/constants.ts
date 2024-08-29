import axios from "axios"

export const fetchAPI = async (city:string) => {
    if (city.toLowerCase() === "banglore" || city.toLowerCase() === "bengluru") {
        city = "Bangalore";
    }
    let URL = `https://api.weatherapi.com/v1/current.json?key=da7a105feaa6431e8b5161159242908&q=${city}`;
    //console.log("CUSTOM URL::", URL)
    try {
        const response = await axios.get(URL);

        if (response.status === 200) {
            //console.log("RESPONSE::", response);
            
            const data = await response.data;
            //console.log(data);
            return data;
            //const { condition, humidity, last_updated, wind_kph, temp_c, temp_f } = current;
        }
    }
    catch (error:any) {
        // if (error.code === "ERR_BAD_REQUEST") {
        //     return error.message;
        // }
         return false

    }
}