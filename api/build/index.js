"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var PORT = 3100;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: 'https://dataguard-ashen.vercel.app/'
}));
// Sample data
var data = {
    "data": {
        "tabs": ["tab1", "tab2", "tab3"],
        "tabdata": {
            "tab1": {
                "title": "Marketing",
                "icon": "icon-marketing",
                "active": ["plugin1", "plugin2", "plugin4"],
                "disabled": ["plugin3"],
                "inactive": ["plugin5", "plugin6"]
            },
            "tab2": {
                "title": "Finance",
                "icon": "icon-finance",
                "active": ["plugin7", "plugin8"],
                "disabled": ["plugin9"],
                "inactive": ["plugin10"]
            },
            "tab3": {
                "title": "Personnel",
                "icon": "icon-people",
                "active": ["plugin11"],
                "disabled": ["plugin12"],
                "inactive": ["plugin13"]
            }
        },
        "plugins": {
            "plugin1": {
                "title": "Plugin 1",
                "description": "Enim cillum tempor veniam do laboris excepteur laborum fugiat aute magna cillum."
            },
            "plugin2": {
                "title": "Plugin 2",
                "description": "Proident sunt consequat exercitation incididunt cupidatat quis ut ut eu ullamco nisi excepteur aliqua."
            },
            "plugin3": {
                "title": "Plugin 3",
                "description": "Amet ea quis qui reprehenderit laborum aute magna incididunt et dolore."
            },
            "plugin4": {
                "title": "Plugin 4",
                "description": "Sunt culpa labore consequat eu veniam laborum."
            },
            "plugin5": {
                "title": "Plugin 5",
                "description": "Proident laborum sint nisi enim non aliqua incididunt dolor voluptate tempor."
            },
            "plugin6": {
                "title": "Plugin 6",
                "description": "Qui cillum velit elit incididunt excepteur nostrud occaecat."
            },
            "plugin7": {
                "title": "Plugin 7",
                "description": "Culpa excepteur aliquip adipisicing sunt sunt proident aute eiusmod."
            },
            "plugin8": {
                "title": "Plugin 8",
                "description": "Eiusmod ex labore cillum elit."
            },
            "plugin9": {
                "title": "Plugin 9",
                "description": "Ut sit sit fugiat qui ullamco ea ea id qui esse magna."
            },
            "plugin10": {
                "title": "Plugin 10",
                "description": "Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit."
            },
            "plugin11": {
                "title": "Plugin 11",
                "description": "Consectetur sit amet velit cillum sunt cillum sunt."
            },
            "plugin12": {
                "title": "Plugin 12",
                "description": "Exercitation in aute ut ex aliqua ea."
            },
            "plugin13": {
                "title": "Plugin 13",
                "description": "Dolor laboris culpa ipsum aliqua velit mollit."
            }
        }
    },
    "errors": null
};
app.get('/v1/api/data', function (req, res) {
    res.json(data);
});
function isTabName(name) {
    return name === 'tab1' || name === 'tab2' || name === 'tab3';
}
function isStateName(name) {
    return name === 'active' || name === 'disabled' || name === 'inactive';
}
app.post('/v1/api/toggle/:tab', function (req, res) {
    var tab = req.params.tab;
    var _a = req.body, active = _a.active, disabled = _a.disabled, inactive = _a.inactive;
    if (!isTabName(tab)) {
        return res.status(404).json({ success: false, message: "Tab not found" });
    }
    data.data.tabdata[tab].active = active;
    data.data.tabdata[tab].disabled = disabled;
    data.data.tabdata[tab].inactive = inactive;
    res.json({ success: true });
});
var previousTabData = JSON.parse(JSON.stringify(data.data.tabdata));
app.post('/v1/api/toggle/all/:action', function (req, res) {
    var action = req.params.action;
    if (!['disable', 'enable'].includes(action)) {
        return res.status(400).json({ success: false, message: "Invalid action provided" });
    }
    if (action === 'enable') {
        data.data.tabdata = previousTabData;
        return res.json({ success: true });
    }
    previousTabData = JSON.parse(JSON.stringify(data.data.tabdata));
    var _loop_1 = function (tab) {
        var tabName = tab;
        ['active', 'inactive'].forEach(function (status) {
            var _a;
            var state = status;
            var arr = data.data.tabdata[tabName][state];
            (_a = data.data.tabdata[tabName]['disabled']).push.apply(_a, arr);
            data.data.tabdata[tabName][state] = [];
        });
    };
    for (var tab in data.data.tabdata) {
        _loop_1(tab);
    }
    res.json({ success: true });
});
app.post('/v1/api/toggle/:tab/:plugin', function (req, res) {
    var _a = req.params, tab = _a.tab, plugin = _a.plugin;
    var state = req.body.state;
    if (!isTabName(tab)) {
        return res.status(404).json({ success: false, message: "Tab not found" });
    }
    if (!isStateName(state)) {
        return res.status(400).json({ success: false, message: "Invalid state provided" });
    }
    // Remove the plugin from all states
    ['active', 'disabled', 'inactive'].forEach(function (status) {
        var state = status;
        var index = data.data.tabdata[tab][state].indexOf(plugin);
        if (index > -1) {
            data.data.tabdata[tab][state].splice(index, 1);
        }
    });
    // Add the plugin to the new state
    if (data.data.tabdata[tab][state]) {
        data.data.tabdata[tab][state].push(plugin);
    }
    res.json({ success: true });
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
