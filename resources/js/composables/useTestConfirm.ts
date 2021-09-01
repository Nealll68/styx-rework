import Vue from 'vue';
import ConfirmComponent from '@/components/Confirm.vue'
import Vuetify from 'vuetify'

export interface ConfirmPropsInterface {
  type?: string,
  title: string,
  message: string,
  continueBtnText?: string,
  cancelBtnText?: string
}

export const useTestConfirm = ((props: ConfirmPropsInterface): Promise<boolean> => {
  console.log(window.$vuetify)
  return new Promise((resolve, reject) => {
    const ComponentClass = Vue.extend({ ...Vuetify, ...ConfirmComponent })
    const instance = new ComponentClass({
      propsData: {
        value: true,
        type: props?.type,
        title: props.title,
        message: props.message,
        continueBtnText: props.continueBtnText,
        cancelBtnText: props.cancelBtnText,
        confirmFunction: () => resolve(true),
        cancelFunction: () => reject(false)
      }
    })

    const container = document.querySelector('[data-app=true]') || document.body
    container.appendChild(instance.$mount().$el)
  })
})


/*
return new Promise((resolve, reject) => {
        var ComponentClass = Vue.extend(TimeoutModalDialog)
        var instance = new ComponentClass({
          propsData: {
            retryFunction:  function() {
              authenticated.request(error.config).then((response) => {
                $("#modal-dialog").modal("close");
                resolve(response);
              }, (error) => {
                reject(error);
              })
            },
            cancelFunction: function(){
              $("#modal-dialog").modal("close");
              reject(error);
            }
          }
        })
        instance.$mount()
        document.getElementById('page').appendChild(instance.$el)
      })
*/