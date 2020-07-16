<template>
    <div class="img-container">
        <img :src="src" width="100%" height="100%">
        <span @click="onDelete" class="material-icons delete-image">close</span>
    </div>
</template>
<script>
export default {
    props: ['file'],
    data(){
        return {
            src: undefined
        }
    },
    methods:{
        onDelete(){
            this.$emit('delete')
        }
    },
    mounted(){
        const reader = new FileReader()
        reader.onload = () => {
            this.src = reader.result
        }
        reader.readAsDataURL(this.file)
    }
}
</script>
<style lang="scss">
.img-container{
    width: 120px;
    height: 120px;
    position: relative;
    //background-color: #eee;
    margin-right: 20px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #eee;
   
    &>img{
        object-fit: contain;
    }
    &>.delete-image{
        position: absolute;
        right: -10px;
        top: -10px;
        cursor: pointer;
        color: rgb(226, 94, 120);
        display: inline-block;
        background-color: #eee;
        border-radius: 50%;
        font-size: 14px;
        padding: 5px;
    }
}
</style>