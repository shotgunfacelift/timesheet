import { defineStore } from 'pinia'
import { markRaw } from 'vue'

interface LoadingState {
  isTimesheetListLoading: boolean;
  isTimesheetContentLoading: boolean;
}

export const useLoadingScreen = defineStore('loading', {
  state: () => ({
    isTimesheetListLoading: true,
    isTimesheetContentLoading: true
  }),

  actions: {
    setLoadingState(variableName: keyof LoadingState, value: boolean) {
      if (this.$state.hasOwnProperty(variableName)) {
        this.$state[variableName] = value
      } else {
        console.warn(`Variable '${variableName}' not found in state.`)
      }
    },
  }
})

export const useColorPalette = defineStore('colors',{
	state: () => ({
		white: '#ffffff',
		black: '#000000',
    textPrimary: '#6b7280',
    textSelected: '#374151',
		gray: '#dedede',
		blue: '#3b97fc',
		blueShadow: '#0f63ca',
		green: '#24c834',
		greenShadow: '#1d9e2b',
		greenInner: '#9df2a7',
		greenOuter: '#1d9e2b',
		red: '#ff2e2e',
		redInner: '#ff8888',
		redOuter: '#bb0000'
	}),
    
	actions: {

	}		
})

export const useSnackbar = defineStore('snackbar', {
  state: () => ({
    show: false,
    text: '',
    color: ''
  }),
  
  actions: {
    showSnackbar(text: string, color: string = '') {
      this.show = true
      this.text = text
      this.color = color
    },
  }
})

export type Button = {
  // need to update to accept icons also
  text: string;
  onClick: () => void;
  color?: string;
}

type DialogBody = {
  title?: string
  description?: string
  buttons?: Button[]
}

export const useDialog = defineStore('dialog', {
  state: () => ({
    show: false,
    component: '',
    componentProps: {},
    body: {
      title: '',
      description: '',
      buttons: [],
	  },
    persistent: false,
  }),

  actions: {
    closeDialog() {
      this.show = false
    },

    showDialog(persistent: boolean, component: any, componentProps?: any, body?: DialogBody ) {
      if (this.show) this.closeDialog()

      setTimeout(() => {
        this.persistent = persistent
        this.component = markRaw(component)
        this.componentProps = componentProps ?? {}
        if (body !== undefined) {
          this.body.title = body.title ?? ''
          this.body.description = body.description ?? ''
          this.body.buttons = body.buttons ?? []
        }
        this.show = true
      }, 200)
    },
  }
})