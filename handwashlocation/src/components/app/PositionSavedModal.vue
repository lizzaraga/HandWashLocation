<template>
    <modal title="Sauvegarder cette position" :isVisible="isVisible" @close="closeModal" :modalClass="modalType">
        
        <div class="main">
            
            <div class="position-card">
                <div class="position-card__lng">
                    <span class="title">
                        Longitude
                    </span>
                    <span class="content">{{latlng.lng.toFixed(7)}}</span>
                </div>
                <div class="position-card__lat">
                    <span class="title">
                        Latitude
                    </span>
                    <span class="content">{{latlng.lat.toFixed(7)}}</span>
                </div>
            </div>
            <div class="images-info">
                <span>Pour mieux localiser la position, veuillez ajouter une description et au moins 2 images (3 max)</span>
            </div>
            <form  @submit.prevent.stop  class="form-images">
                <div class="textarea-block">
                   <label for="description">Description</label>
                    <textarea v-model="description" required name="description" id="description" 
                    placeholder="Ajouter une description de la zone"
                    rows="2"></textarea>
                    <span class="input-helper-text">10 lettres minimun</span>
                </div>
                <section>
                    <!-- <div :key="i" v-for='(file, i) in files' class="x-image"></div> -->
                    <position-image @delete="deleteImage(file)" :key="i" v-for='(file, i) in files' :file="file"/>
                    <label v-show="files.length < 3" for="image" class="x-image-add">
                        <i class="material-icons add-icon">add</i>
                        <span>Ajouter une image</span>
                    </label>
                    <input capture style="display: none" type="file" name="image" id="image" @change="onChange($event)">
                </section>
                <div class="form-actions">
                    <button @click="sendPosition({files, 'position': latlng, description})" :disabled = "disableSaveButton" class="x-btn blue-theme">SAUVEGARDER</button>
                    <button @click="closeModal" style="margin-right: 8px" class="x-btn red-highlight-theme">ANNULER</button>
                </div>
            </form>
            <div class="absolute-center-box" v-show="addPositionLoading">
                <span class="circle-loading"></span>
                <p style="font-size: 14px">Sauvegarde en cours ...</p>
            </div>
            <audio style="display: none" ref="audio" src="../../assets/insight.mp3" controls/>
        </div>

    </modal>
</template>
<script>
import Modal from '../Modal.vue'
import PositionImage from './PositionImage'
import {mapActions, mapState} from 'vuex'
export default {
    props: {
        isVisible: {type: Boolean, required: true},
        latlng: {type: Object, required: true}
    },
    data(){
        return {
            files : [],
            description: "",
            modalType: 'x-big-modal'
        }
    },
    computed:{
        ...mapState('position', ['addPositionLoading', 'addPositionHasError']),
        disableSaveButton(){
            return this.files.length < 2 || this.description.length < 10;
        }
    },
    methods: {
        closeModal(value){
            this.files = []
            this.$emit('close', value)
        },
        onChange(e){
            if(e.target.files[0] != undefined)
                this.files.push(e.target.files[0])
            
        },
        deleteImage(file){
            let files = this.files.filter(f => {
                return f.name != file.name
            })
            this.files = files
        },
        async sendPosition(data){
            await this.savePosition(data)
            if(this.addPositionHasError){
                alert('Une erreur est survenue durant la connexion ! Verifiez votre connexion.')
            }
            else{
                this.$refs.audio.play()
            }
            if(this.addPositionLoading == false) this.closeModal(true)
        },
        ...mapActions('position', ['savePosition'])
    },
    components:{
        Modal, PositionImage
    },
    mounted(){
         /* window.addEventListener('resize', (e) => {
            if(window.innerWidth > 600){
                if(this.modalType != 'x-big-modal'){
                    this.modalType = 'x-big-modal'
                }
            }
            else{
                if(this.modalType != 'x-fullscreen-modal'){
                    this.modalType = 'x-fullscreen-modal'
                }
            }
        }) */
    }
}
</script>

<style lang="scss" scoped>


.your-location-title{
    text-align: center;
    margin: 15px 0 20px 0;
    padding: 0;

    &>span{
        display: inline-block;
        position: relative;
        &::after{
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 4px;
            background-color: #2e3c50;
            transform: scale(0.5);
        }
    }
    
}
.main{
    display: flex;
    flex-direction: column;
   
    height: 100%;
    position: relative;
    &>.position-card{
        align-self: flex-start;
        border-radius: 5px;
        display: flex;
        padding: 8px 10px;
        background-color: rgb(194, 107, 36);
        color:white;
        margin: 0 auto;
        &>.position-card__lng{
            margin-right: 5px;
        }
        &>.position-card__lat{
            margin-left: 5px;
        }
        &>.position-card__lng, .position-card__lat{
            display: flex;
            flex-direction: column;

            &>.title{
                font-size: 12px;
                font-weight: bold;
                color: rgba($color: (#fff), $alpha: 0.6)
            }
            &>.content{
                font-size: 15px;
                display: inline-block;
                margin-top: 5px;
                
            }
        }
    }
    &>.images-info{
        margin: 10px 0;
        padding: 10px;
        //margin-top: 0;
        font-size: 13px;
        border-radius: 5px;
        color: dodgerblue;
        font-weight: 600;
        //border: 1px solid  rgb(195, 255, 232);
        
    }
}

.form-images{
    .textarea-block{
        display: flex;
        flex-direction: column;
        border: 2px solid transparent;
        border-bottom: 2px solid #bbb;
        padding: 5px 10px;
        &>label{
            font-size: 13px;
            display: inline-block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        &>textarea{
            border: none;
            outline: none;
        }
        &:focus{
            border-bottom-color: #2e3c50;
        }
    }
    &>section{
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        .x-image, .x-image-add{
            width: 120px;
            height: 120px;
            background-color: #eee;
            display: inline-block;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .x-image-add{
            font-size: 12px;
            padding: 10px;
            font-weight: bold;
            cursor: pointer;
            .add-icon{
                font-size: 30px;
            }
        }
    }

    &>.form-actions{
        margin-top: 15px;
        display: flex;
        flex-direction: row-reverse;
    }
    
}
.input-helper-text{
    font-size: 11px;
    letter-spacing: 1px;
}
</style>