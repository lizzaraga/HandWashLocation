<template>
    <div class="carousel">
        <slot></slot>
        <div class="navigation">
           <div class="navigation-container">
                <button @click.prevent='goto(i-1)' :key='i' v-for='i in slidesCount' :class="{'active': i - 1 == index}" class="navigation-item"></button>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            index: 0,
            slides: [],
            direction: null
        }
    },
    computed:{
        slidesCount(){
            return this.slides.length
        }
    },
    methods:{
        next(){
            this.index ++
            this.direction = 'right'
            if(this.index >= this.slidesCount)
                this.index = 0
            
        },
        prev(){
            this.index --
            this.direction = 'left'
            if (this.index < 0){
                this.index = this.slidesCount - 1
            }
        },
        goto(index){
            this.direction = index > this.index ? 'right' : 'left'
            this.index = index
        }
    }, 
    mounted(){
        this.slides = this.$children;
        //console.log(this.slides)
        this.slides.forEach((slide, i) => {
            slide.index = i
        })

        setInterval(() => {
            this.next()
        }, 2000);
    }
}
</script>

<style lang="scss" scoped>
.carousel{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.carousel-nav{
    position: absolute;
    top: 50%;

    &.carousel__next{
        right: 0;
        left: auto;
    }
}
.navigation{
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 20px;
    left: 0;
    right: 0;
    &>.navigation-container{
        padding: 5px 10px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.623);
        display: flex;
        align-items: center;
        &>.navigation-item{
            border: none;
            padding: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 5px;
            background-color: rgb(128, 128, 128);
            outline: none;
            &.active{
                background-color: rgb(9, 75, 255);
            }
        }
    }

}
</style>

