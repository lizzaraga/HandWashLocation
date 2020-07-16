<template>
    <modal title="Apercu des coordonnées" :isVisible="isVisible" @close="closeModal" modalClass="x-big-modal">
        <div>
            <div class="description">
                <span>Description</span>
                <p v-if="selectedPosition.description != ''">
                    {{selectedPosition.description}}
                </p>
                <p v-else style="color: #aaa; font-style: italic">
                    Aucune description
                </p>
            </div>

            <carousel v-if="selectedPositionImages.length > 0">
                <carousel-slide :key="i" v-for="(img, i) in selectedPositionImages">
                    <img style="object-fit: cover" :src="img" :alt="'image_'+i" width="100%" height="300px">
                </carousel-slide>
            </carousel>
        </div>
        <template #footer>
            <div class="footer">
                <button @click="openNumberAlert" class="x-btn blue-highlight-theme">PARTAGER PAR SMS</button>
                <button @click="closeModal" class="x-btn red-highlight-theme">Quitter</button>
                
            </div>
        </template>
    </modal>
</template>
<script>
import Modal from '../Modal.vue'
//import PositionImage from './PositionImage'
import Carousel from '../carousel/Carousel.vue'
import CarouselSlide from '../carousel/CarouselSlide.vue'
import {mapState} from 'vuex'
export default {
    props: {
        isVisible: {type: Boolean, required: true},
        
        //latlng: {type: Object, required: true}
    },
    data(){
        return {
            
            modalType: 'x-big-modal',
            receiver: {number: ''}
        }
    },
    computed:{
        message2Send(){
            return `sms:${this.receiver.number}?&body=Position: Lat: ${this.selectedPosition.lat}; Long: ${this.selectedPosition.lng}`
        },
        ...mapState('position', ['addPositionLoading',
         'addPositionHasError', 'selectedPositionImages', 'selectedPosition']),
    },
    methods: {
        closeModal(value){
            this.$emit('close', value)
        },
        openNumberAlert(){
            const response = prompt('Entrer le numéro du destinataire : ')
            this.receiver.number = response;
            window.open(this.message2Send)
        }
       
    },
    components:{
        Modal, Carousel, CarouselSlide
    },
    mounted(){
         
    }
}
</script>

<style lang="scss" scoped>
.footer{
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
}
.description{
    font-size: 13px;
    &>span{
        font-weight: 600;
    }
}
</style>