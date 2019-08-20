Ext.onReady(function () {
    let selectionModel = new Ext.grid.CheckboxSelectionModel();
    let columnModel = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        selectionModel,
        {
            header: 'name',
            dataIndex: 'name',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false})),
            sortable: true
        },
        {
            header: 'class',
            dataIndex: 'class',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false})),
            sortable: true
        },
        {
            header: 'sex',
            dataIndex: 'sex',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false}))
        },
        {
            header: 'age',
            dataIndex: 'age',
            editor: new Ext.grid.GridEditor(new Ext.form.NumberField({allowBlank: false}))
        },
        {
            header: 'birthday',
            dataIndex: 'birthday',
            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            editor: new Ext.grid.GridEditor(new Ext.form.DateField({allowBlank: false}))
        },
        {
            header: 'avatar',
            dataIndex: 'avatar',
            editor: new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false}))
        }
    ]);
    let data = [
        ['Felicity', 'Bering', 'female', 22, '1997-01-16', 'avatar1'],
        ['Jerry', 'Bering', 'male', 22, '1996-01-16', 'avatar2'],
        ['Joi', 'Panama', 'female', 22, '1996-07-16', 'avatar3']
    ];
    let store = new Ext.data.GroupingStore({
        proxy: new Ext.data.MemoryProxy(data),
        reader: new Ext.data.ArrayReader({}, [
            {name: 'name'},
            {name: 'class'},
            {name: 'sex'},
            {name: 'age', type: 'number'},
            {name: 'birthday', type: 'date', dataFormat: 'Y-m-d'},
            {name: 'avatar'}
        ]),
        groupField: 'class'
    });
    store.load();
    let studentGrid = new Ext.grid.EditorGridPanel({
        cm: columnModel,
        sm: selectionModel,
        store: store,
        autoHeight: true,
        view: new Ext.grid.GroupingView(),
        listeners: {
            afteredit: function() {
                studentGrid.view.refresh();
            }
        }
    });
    let StudentRecord = new Ext.data.Record.create([
        {name: 'name', type: 'string'},
        {name: 'class', type: 'string'},
        {name: 'sex', type: 'string'},
        {name: 'age', type: 'number'},
        {name: 'birthday', type: 'date'},
        {name: 'avatar', type: 'string'},
    ]);

    function getInsertRowNumber() {
        let selectedRow = studentGrid.getSelectionModel().getSelected();
        return store.indexOf(selectedRow) + 1;
    }

    let window = new Ext.Window({
        title: 'Student Management',
        width: 700,
        height: 400,
        items: [studentGrid],
        buttonAlign: 'center',
        buttons: [{
            text: 'add',
            handler: function () {
                let newStudent = {name: '', class: '', sex: '', age: 0, birthday: '', avatar: ''};
                studentGrid.stopEditing();
                let rowNumber = getInsertRowNumber();
                store.insert(rowNumber, new StudentRecord(newStudent));
                studentGrid.startEditing(rowNumber, 0);
            }
        }, {
            text: 'Delete',
            handler: function() {
                let selections = selectionModel.getSelections();
                store.remove(selections);
            }
        }]
    });
    window.show();
});