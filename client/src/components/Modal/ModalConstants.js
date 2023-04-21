export const ModalType = {
    FOOD_JOURNAL: "FOOD_JOURNAL",
    SLEEP_WATER_JOURNAL: "SLEEP_WATER_JOURNAL",
    ACTIVITY_MODAL: "ACTIVITY_MODAL",
    ACTIVITY_OPTIONS_MODAL: "ACTIVITY_OPTIONS_MODAL"
}

export const getModalTypesBasedOnNames = (name) => {
    switch(name) {
        case "sleep":
            return ModalType.SLEEP_WATER_JOURNAL;
        case "water":
            return ModalType.SLEEP_WATER_JOURNAL;
        case "food":
            return ModalType.FOOD_JOURNAL;
        default:
            return name;
    }
}