import {bootstrap, Component, View, For} from 'angular2/angular2';

class CatalogService {
    items: List<Object>;

    constructor() {
        this.items = [
            { id: 0, name: 'Ferrari', price: 2e5 },
            { id: 1, name: 'Porsche', price: 1e5 }
        ];
    }
}

class CartService {
    items: List<Object>;

    constructor() {
        this.items = [];
    }

    addItem(newItem) {
        var existentItems = this.items.filter(function(item) {
            return item.id === newItem.id
        });

        if (existentItems.length) {
            existentItems[0].quantity += 1
        } else {
            newItem.quantity = 1;
            this.items.unshift(newItem);
        }
    }

    removeItem(targetItem) {
        var self = this;

        this.items.forEach(function(item, idx) {
            if (targetItem.id === item.id) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    self.items.splice(idx, 1);
                }
            }
        });
    }
}


@Component({
    selector: 'shopping-cart-app',
    injectables: [
        CatalogService,
        CartService
    ]
})

@View({
    templateUrl: 'catalog.html',
    directives: [For]
})
class ShoppingCmp {
    items: List<Object>;

    constructor(catalog:CatalogService, cart:CartService) {
        this.catalog = catalog;
        this.cart = cart;
    }
}

bootstrap(ShoppingCmp);

