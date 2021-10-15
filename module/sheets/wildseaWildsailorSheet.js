export default class wildseaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 1200,
            height: 800,
            template: 'systems/wildsea/templates/sheets/wildsailor-sheet.hbs',
            classes: ["wildsea", "sheet", "wildsailor"]
        });
    }

    itemContextMenu = [
        {
            name: game.i18n.localize("wildsea.sheet-buttons.delete"),
            icon: '<i class = "fas fa-trash"></i>',
            callback: element => {
                this.actor.deleteEmbeddedDocuments("Item", [element.data("item-id")]);
            }
        }
    ]

    getData() {
        const baseData = super.getData();
        let sheetData = {
            owner: this.actor.isOwner,
            editable: this.isEditable,
            actor: baseData.actor,
            data: baseData.actor.data.data,
            config: CONFIG.wildsea
        }
        
        sheetData.aspects = baseData.items.filter(function(item) {return item.type == "aspect"})

        return sheetData;
    }

    activateListeners(html) {
        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));
        html.find(".inline-edit").change(this._onAspectEdit.bind(this));
        html.find(".box-create").change(this._onBoxCreate.bind(this));

        new ContextMenu(html, ".aspect-item", this.itemContextMenu);
        new ContextMenu(html, ".box-item", this.itemContextMenu);
        
        super.activateListeners(html);
    }

    _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;

        let itemData = {
            name: game.i18n.localize("wildsea.sheet-buttons.new-item"),
            type: element.dataset.type,
        }

        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    _onAspectEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let field = element.dataset.field;

        return item.update({ [field]: element.value });
    }

    _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        return this.actor.deleteEmbeddedDocuments("Item", [itemId]);
    }

    _onBoxCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let field = element.dataset.field;

        return item.update({ [field]: element.value });
    }
}