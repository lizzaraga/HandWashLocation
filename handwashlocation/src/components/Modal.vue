<template>
    <transition name="fade">
        <div class="x-modal-backdrop" @click.self="closeModal" v-show="isVisible">
            <transition name="up" appear>
                <div class="x-modal" :class="modalClass" v-show="showInnerModal">
                    <header  v-if="showHeader">
                        <slot name="header">
                            <div class="default">
                                <span>{{title}}</span>
                                <button class="material-icons modal-close-btn" @click="closeModal">
                                close
                                </button>
                            </div>
                        </slot>
                        
                    </header>

                    <main>
                        <slot></slot>
                    </main>

                    <footer v-if="showFooter">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
    props:{
        isVisible:{type: Boolean, default: true},
        title : {type: String},
        showHeader: {type: Boolean, default: true},
        showFooter: {type: Boolean, default: true},
        modalClass: {type: String}
    },
    data(){
        return {
            showInnerModal: false
        }   
    },
    watch:{
        isVisible(n, o){
            this.showInnerModal = n;
        }
    },
    methods:{
        closeModal(){
            this.$emit('close')
        }
    },
    
    
})
</script>

<style lang="scss" scoped>
.x-modal-backdrop{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display:flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: auto;
    .x-modal{
        position: relative;
        background-color: #fff;
        width: 400px;
        max-height : 600px;
        border-radius:3px;
        display: flex;
        flex-direction: column;
        overflow: auto;
        
        &.x-big-modal{
            width: 600px;
        }
        &.x-medium-modal{
            width: 450px;
        }
        &.x-tiny-modal{
            width: 250px;
        }
        &.x-fullscreen-modal{
            width: 100%;
            height: 100%;
        }
        header{
           
            .default{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 55px;
                padding: 0 15px;
                border-bottom: 1px solid #eee;
               
                span{
                    font-size: 0.8em;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: 600;
                    color: #555;
                }
            }
        }
        main{
            width: 100%;
            height: 100%;
            padding: 15px;
            
        }
    }
    
}
.modal-close-btn{
    border: none;
    padding: 0 !important;
    margin: 0;
    border-radius: 50%;
    font-size: 18px;
    outline: none;
    font-weight: bold;
    color: #aaa;
    background-color: transparent;
    cursor: pointer;
    &:hover{
        color: crimson;
    }
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active{
    transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.up-enter, .up-leave-to{
    opacity: 0;
    transform: scale(1.3);
}
.up-enter-active, .up-leave-active{
    transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>