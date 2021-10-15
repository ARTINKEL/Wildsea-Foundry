import wildseaItemSheet from "./module/sheets/wildseaItemSheet.js";
import wildseaWildsailorSheet from "./module/sheets/wildseaWildsailorSheet.js";
import { wildsea } from "./module/config.js"

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        //"systems/wildsea/templates/partials/asdf.hbs"
    ];

    return loadTemplates(templatePaths);
}

Hooks.once("init", function() {
    console.log("wildsea | Initializing Wildsea system");

    CONFIG.wildsea = wildsea;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("wildsea", wildseaItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("wildsea", wildseaWildsailorSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

    Handlebars.registerHelper("times", function(n, content) {
        let result = "";
        for (let i = 0; i < n; ++i) {
            result += content.fn(i);
        }
        return result;
    });
});