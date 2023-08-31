
import express from 'express';
import cors from 'cors';

const PORT = 3100;

const app = express();
app.use(express.json());
app.use(cors())

// Sample data
const data = {
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

app.get('/v1/api/data', (req, res) => {
    res.json(data);
});

type TabName = 'tab1' | 'tab2' | 'tab3';

function isTabName(name: string): name is TabName {
    return name === 'tab1' || name === 'tab2' || name === 'tab3';
}

type StateName =  'active' | 'disabled' | 'inactive';

function isStateName(name: string): name is StateName {
    return name === 'active' || name === 'disabled' || name === 'inactive';
}

app.post<{tab: TabName}, {},{active: string[], disabled: string[], inactive:[]}>('/v1/api/toggle/:tab', (req, res) => {
    const { tab } = req.params;
    const { active, disabled, inactive } = req.body;

    if (!isTabName(tab)) {
        return res.status(404).json({ success: false, message: "Tab not found" });
    }

    data.data.tabdata[tab].active = active;
    data.data.tabdata[tab].disabled = disabled;
    data.data.tabdata[tab].inactive = inactive;

    res.json({ success: true });
});

let previousTabData = JSON.parse(JSON.stringify(data.data.tabdata));

app.post<{action: 'disable' | 'enable'}>('/v1/api/toggle/all/:action', (req, res) => {
    const { action } = req.params;

    if (!['disable', 'enable'].includes(action)) {
        return res.status(400).json({ success: false, message: "Invalid action provided" });
    }

    if (action === 'enable') {
        data.data.tabdata = previousTabData;
        return res.json({ success: true });
    }

    previousTabData = JSON.parse(JSON.stringify(data.data.tabdata));

    for (const tab  in data.data.tabdata) {
        const tabName = tab as TabName;
        ['active', 'inactive'].forEach(status => {
            const state = status as StateName;
            const arr = data.data.tabdata[tabName][state];
            data.data.tabdata[tabName]['disabled'].push(...arr);
            data.data.tabdata[tabName][state] = [];
        });
    }


    res.json({ success: true });
});

app.post<{tab: TabName, plugin: string}, {}, {state: StateName}>('/v1/api/toggle/:tab/:plugin', (req, res) => {
    const { tab, plugin } = req.params;
    const { state } = req.body;

    if (!isTabName(tab)) {
        return res.status(404).json({ success: false, message: "Tab not found" });
    }

    if (!isStateName(state)) {
        return res.status(400).json({ success: false, message: "Invalid state provided" });
    }

    // Remove the plugin from all states
    ['active', 'disabled', 'inactive'].forEach(status => {
        const state = status as StateName;
        const index = data.data.tabdata[tab][state].indexOf(plugin);
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
