import {Module} from "vuex";

interface textState{
	content: string
	fontFamily: string
	fontSize: number
	justification: string
	fillColor: string
	fillEnabled: boolean
	strokeColor: string
	strokeEnabled: boolean
	strokeWidth: number
	shadowColor: string
	shadowEnabled: boolean
	shadowBlur: number
	shadowOffsetX: number
	shadowOffsetY: number
	opacity: number
	rotation: number
}
const TextState:Module<textState, any>={
	namespaced: true,
	state:{
		content:"Текст",
		fontFamily: "Cambria",
		fontSize: 50,
		justification: "left",
		fillColor: "#ffffff",
		fillEnabled: true,
		strokeColor:"#000000",
		strokeEnabled:true,
		strokeWidth: 1,
		shadowColor: "#000000",
		shadowEnabled: false,
		shadowBlur: 1,
		shadowOffsetX: 1,
		shadowOffsetY: 1,
		opacity: 1,
		rotation: 1
	},
	getters:{
		getTextOptions:(state):textState=>state,
		getContent:(state):string=>state.content,
		getFontFamily:(state):string=>state.fontFamily,
		getFontSize:(state):number=>state.fontSize,
		getJustification:(state):string=>state.justification,
		getFillColor:(state):string=>state.fillColor,
		getFillEnabled:(state):boolean=>state.fillEnabled,
		getStrokeColor:(state):string=>state.strokeColor,
		getStrokeWidth:(state):number=>state.strokeWidth,
		getStrokeEnabled:(state):boolean=>state.strokeEnabled,
		getShadowColor:(state):string=>state.shadowColor,
		getShadowEnabled:(state):boolean=>state.shadowEnabled,
		getShadowBlur:(state):number=>state.shadowBlur,
		getShadowOffsetX:(state):number=>state.shadowOffsetX,
		getShadowOffsetY:(state):number=>state.shadowOffsetY,
		getOpacity:(state):number=>state.opacity,
		getRotation:(state):number=>state.rotation
	},
	mutations:{
		setContent:(state, value:string)=>state.content = value,
		setFontFamily:(state, value:string)=>state.fontFamily = value,
		setFontSize:(state, value:number)=>state.fontSize = value,
		setJustification:(state, value:string)=>state.justification = value,
		setFillColor:(state, value:string)=>state.fillColor = value,
		setFillEnabled:(state, value:boolean)=>state.fillEnabled = value,
		setStrokeColor:(state, value:string)=>state.strokeColor = value,
		setStrokeWidth:(state, value:number)=>state.strokeWidth = value,
		setStrokeEnabled:(state, value:boolean)=>state.strokeEnabled = value,
		setShadowColor:(state, value:string)=>state.shadowColor = value,
		setShadowEnabled:(state, value:boolean)=>state.shadowEnabled = value,
		setShadowBlur:(state, value:number)=>state.shadowBlur = value,
		setShadowOffsetX:(state, value:number)=>state.shadowOffsetX = value,
		setShadowOffsetY:(state, value:number)=>state.shadowOffsetY = value,
		setOpacity:(state, value:number)=>state.opacity = value,
		setRotation:(state, value:number)=>state.rotation = value
	}
}

export default TextState
