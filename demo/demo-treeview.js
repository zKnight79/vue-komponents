var appTreeview = new Vue({
    el: '#treeview-app',
    data: {
        nodes: [{
                label: 'Root 1',
                isFolder: true,
                children: [
                    {
                        label: 'Folder 1.1',
                        isFolder: true,
                        children: [
                            {
                                label: 'Folder 1.1.1',
                                isFolder: true,
                                children: [{
                                        label: 'Node 1.1.1.1',
                                        icon: 'fas fa-chess-knight',
                                        title: 'This node has a Chess Knight icon'
                                    },
                                    {
                                        label: 'Node 1.1.1.2'
                                    },
                                    {
                                        label: 'Node 1.1.1.3 <i class="fas fa-plus-circle" style="color:red;"></i>',
                                        title: 'This node has a Red Plus Circle'
                                    }
                                ]
                            },
                            {
                                label: 'Node 1.1.2'
                            },
                            {
                                label: 'Node 1.1.3'
                            }
                        ]
                    },
                    {
                        label: 'Node 1.2'
                    },
                    {
                        label: 'Node 1.3'
                    }
                ]
            },
            {
                label: 'Root 2',
                isFolder: true
            },
            {
                label: 'Root 3',
                isFolder: true
            },
            {
                label: 'Root 4',
                isFolder: true,
                isOpen: true,
                iconFolderClosed: 'fas fa-folder',
                iconFolderOpen: 'fas fa-folder-open',
                children: [
                    {
                        label: 'Node 4.1'
                    },
                    {
                        label: 'Folder 4.2',
                        isFolder: true,
                        children: [
                            {
                                label: 'Node 4.2.1'
                            },
                            {
                                label: 'Node 4.2.2'
                            },
                            {
                                label: 'Node 4.2.3'
                            }
                        ]
                    },
                    {
                        label: 'Node 4.3'
                    }
                ]
            },
            {
                label: 'Root 5',
                isFolder: true,
                lazyLoading: true,
                lazyLoadChildren: function(finishedCallback) {
                    var self = this;
                    setTimeout(function(){
                        Vue.set(self, 'children', []);
                        var childCount = Math.floor((Math.random() * 10) + 1);;
                        for(var i=1; i <= childCount; ++i) {
                            self.children.push({label:'Lazy node 5.' + i});
                        }
                        finishedCallback(self);
                    }, 2000);
                }
            }
        ]
    }
});