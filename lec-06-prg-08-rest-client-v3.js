const axios = require('axios');

const BaseURL = 'http://127.0.0.1:5000/membership_api';

async function runRestClient() {
    try {
        let r;
        let params;

        r = await axios.get(`${BaseURL}/0001`);
        console.log(`#1 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0001']}`);

        params = new URLSearchParams();
        params.append('0001', 'apple');
        r = await axios.post(`${BaseURL}/0001`, params);
        console.log(`#2 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0001']}`);

        r = await axios.get(`${BaseURL}/0001`);
        console.log(`#3 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0001']}`);

        params = new URLSearchParams();
        params.append('0001', 'xpple');
        r = await axios.post(`${BaseURL}/0001`, params);
        console.log(`#4 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0001']}`);

        params = new URLSearchParams();
        params.append('0002', 'xrange');
        r = await axios.put(`${BaseURL}/0002`, params);
        console.log(`#5 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0002']}`);

        params = new URLSearchParams();
        params.append('0002', 'xrange');
        await axios.post(`${BaseURL}/0002`, params);
        
        params = new URLSearchParams();
        params.append('0002', 'orange');
        r = await axios.put(`${BaseURL}/0002`, params);
        console.log(`#6 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0002']}`);

        r = await axios.delete(`${BaseURL}/0001`);
        console.log(`#7 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0001']}`);

        r = await axios.delete(`${BaseURL}/0001`);
        console.log(`#8 Code: ${r.status} >> JSON: ${JSON.stringify(r.data)} >> JSON Result: ${r.data['0001']}`);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

runRestClient();