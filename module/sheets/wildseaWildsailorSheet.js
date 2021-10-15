export default class wildseaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 1200,
            height: 800,
            template: 'systems/wildsea/templates/sheets/wildsailor-sheet.hbs',
            classes: ["wildsea", "sheet", "wildsailor"]
        });
    }

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
        html.find(".inline-edit").change(this._onSkillEdit.bind(this));

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

    _onSkillEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let field = element.dataset.field;

        return item.update({ [field]: element.value });
    }
}