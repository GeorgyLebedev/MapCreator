import { Module } from "vuex";

enum flags {
    ShowDelMapWin = 'showDelMapWin',
    ShowStampsWin = 'showStampsWin',
    ShowImgLoadWin = 'showImgLoad',
    ShowNewMapWin = 'showNewMapWin',
    ShowEditMapWin = 'showEditMapWin',
    ShowProfile = 'showProfile',
}

interface FlagsState {
    [flags.ShowDelMapWin]: boolean
    [flags.ShowStampsWin]: boolean
    [flags.ShowImgLoadWin]: boolean
    [flags.ShowNewMapWin]: boolean
    [flags.ShowEditMapWin]: boolean
    [flags.ShowProfile]: boolean
}

const modalFlags: Module<FlagsState, any> = {
    namespaced: true,
    state: (): FlagsState => ({
        [flags.ShowDelMapWin]: false,
        [flags.ShowStampsWin]: false,
        [flags.ShowImgLoadWin]: false,
        [flags.ShowNewMapWin]: false,
        [flags.ShowEditMapWin]: false,
        [flags.ShowProfile]: false,
    }),
    mutations: {
        setShowEditMapWin(state: FlagsState, value: boolean): void {
            state[flags.ShowEditMapWin] = value;
        },
        setShowStampsWin(state: FlagsState, value: boolean): void {
            state[flags.ShowStampsWin] = value;
        },
        setShowImgLoadWin(state: FlagsState, value: boolean): void {
            state[flags.ShowImgLoadWin] = value;
        },
        setShowNewMapWin(state: FlagsState, value: boolean): void {
            state[flags.ShowNewMapWin] = value;
        },
        setShowDelMapWin(state: FlagsState, value: boolean): void {
            state[flags.ShowDelMapWin] = value;
        },
        setShowProfile(state: FlagsState, value: boolean): void {
            state[flags.ShowProfile] = value;
        },
    },
    getters: {
        showEditMapWin(state: FlagsState): boolean {
            return state[flags.ShowEditMapWin];
        },
        showStampsWin(state: FlagsState): boolean {
            return state[flags.ShowStampsWin];
        },
        showImgLoadWin(state: FlagsState): boolean {
            return state[flags.ShowImgLoadWin];
        },
        showNewMapWin(state: FlagsState): boolean {
            return state[flags.ShowNewMapWin];
        },
        showDelMapWin(state: FlagsState): boolean {
            return state[flags.ShowDelMapWin];
        },
        showProfile(state: FlagsState): boolean {
            return state[flags.ShowProfile];
        },
    },
};
export default modalFlags;
