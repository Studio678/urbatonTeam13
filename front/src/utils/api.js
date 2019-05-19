import axios from 'axios';

const apiUrl = 'http://hacathon.liinda.ru:8082';

/**
 * Claims by collector id
 * @param collectorId
 * @param cb
 */
export const apiGetClaims = (collectorId, cb) => {
    const url = `${apiUrl}/claims/${collectorId}`;
    console.log(url);
    cb([{
        id: 1,
        createdDttm: new Date('2019-05-18 23:00:00'),
        citizenId: 1,
        citizenLogin: 'vasya',
        garbageType: 'glass',
        address: 'some address'
    }, {
        id: 2,
        createdDttm: new Date('2019-05-18 23:24:12'),
        citizenId: 2,
        citizenLogin: 'kolya',
        garbageType: 'plastic',
    }, {
        id: 3,
        createdDttm: new Date('2019-05-17 12:44:13'),
        citizenId: 3,
        citizenLogin: 'petya',
        garbageType: 'wood',
        address: 'some address 2'
    }]);
    return;

    axios.get(url)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
};

export const apiAcceptGarbage = (collectorId, citizenId, garbageType, weight, cb) => {
    const url = `${apiUrl}/claims/${collectorId}/${citizenId}`;
    console.log(url);
    cb();
    return;

    axios.post(url, {
        garbageType: garbageType,
        weight: weight
    })
        .then(res => {
        })
        .catch(err => {
        });
};

export const apiGetCitizens = (search, cb) => {
    const url = `${apiUrl}/citizens/search?login=${search}`;
    console.log(url);
    cb([
        {id: 1, login: 'vasya'},
        {id: 2, login: 'kolya'},
        {id: 3, login: 'petya'},
    ]);
    return;

    axios.get(url)
        .then(res => {
        })
        .catch(err => {
        });
};

export const apiGetCollectors = (garbageType, cb) => {
    const url = `${apiUrl}/collectors/search?garbageType=${garbageType}`;
    console.log(url);
    cb([
        {id: 1, name: 'collector1', address: 'collector address 1'},
        {id: 2, name: 'collector2', address: 'collector address 2'},
        {id: 3, name: 'collector3', address: 'collector address 3'},
    ]);
    return;

    axios.get(url)
        .then(res => {
        })
        .catch(err => {
        });
};

export const apiGetGarbageTypes = (cb) => {
    const url = `${apiUrl}/garbage/types`;
    console.log(url);
    const res = ['glass', 'plastic', 'clothes', 'metal', 'wood'];
    const mapGarbageTypes = {
        glass: 'Стекло',
        plastic: 'Пластик',
        clothes: 'Одежда/тряпки',
        metal: 'Металл',
        wood: 'Дерево',
    };
    const types = res.map(type => ({
        id: type,
        title: (mapGarbageTypes.hasOwnProperty(type) ? mapGarbageTypes[type] : type)
    }));
    cb(types);
    return;

    axios.get(url)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
};
