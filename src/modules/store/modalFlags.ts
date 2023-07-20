import { Module } from "vuex";

interface FlagsState {
    showEditMapWin: boolean;
    showStampsWin: boolean;
    showImgLoadWin: boolean;
    showNewMapWin: boolean;
    showDelMapWin: boolean;
    showProfile: boolean;
}

const modalFlags: Module<FlagsState, any> = {
    namespaced: true,
    state: (): FlagsState => ({
        showDelMapWin: false,
        showStampsWin: false,
        showImgLoadWin: false,
        showNewMapWin: false,
        showEditMapWin: false,
        showProfile: false,
    }),
    mutations: {
        setShowEditMapWin(state: FlagsState, value: boolean): void {
            state.showEditMapWin = value;
        },
        setShowStampsWin(state: FlagsState, value: boolean): void {
            state.showStampsWin = value;
        },
        setShowImgLoadWin(state: FlagsState, value: boolean): void {
            state.showImgLoadWin = value;
        },
        setShowNewMapWin(state: FlagsState, value: boolean): void {
            state.showNewMapWin = value;
        },
        setShowDelMapWin(state: FlagsState, value: boolean): void {
            state.showDelMapWin = value;
        },
        setShowProfile(state: FlagsState, value: boolean): void {
            state.showProfile = value;
        }
    },
    getters: {
        showEditMapWin(state: FlagsState): boolean {
            return state.showEditMapWin;
        },
        showStampsWin(state: FlagsState): boolean {
            return state.showStampsWin;
        },
        showImgLoadWin(state: FlagsState): boolean {
            return state.showImgLoadWin;
        },
        showNewMapWin(state: FlagsState): boolean {
            return state.showNewMapWin;
        },
        showDelMapWin(state: FlagsState): boolean {
            return state.showDelMapWin;
        },
        showProfile(state: FlagsState): boolean {
            return state.showProfile;
        }
    }
};

export default modalFlags;
