const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        title: {
            type: String,
            value: ""
        },
        desc: {
            type: String,
            value: ""
        },
    },
    data: {},

    methods: {
        serachAddr(e) {
            app.globalData.test_name = "Aloha"
            console.log(app.globalData.test_name)
        },
    },
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
