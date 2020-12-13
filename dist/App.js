import React, { useEffect, useState } from 'react';
import axios from 'axios';
var App = function () {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    var postData = {
        title: 'licop',
        body: 'hello man'
    };
    useEffect(function () {
        axios.post('https://jsonplaceholder.typicode.com/posts', postData)
            .then(function (resp) {
            setTitle(resp.data.title);
        });
    });
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            var uploadedFile = files[0];
            var formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }).then(function (res) {
            });
        }
    };
    return (React.createElement("div", { className: "App" },
        title,
        React.createElement("input", { type: "file", name: "myfile", onChange: handleFileChange })));
};
export default App;
