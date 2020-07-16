<template>
    <transition :name="transition">
        <div v-show="visible" class='carousel-slide'>
        
        <slot> </slot>
    </div>
    </transition>
</template>
<script>
export default {
    data(){
        return {
            index: 0
        }
    }, 
    computed:{
        visible(){
            return this.index == this.$parent.index
        },
        transition(){
            if(this.$parent.direction)
                return 'slide-'+this.$parent.direction
            return ''
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-right-enter-active{
    animation: slideRightIn 0.5s

}
.slide-right-leave-active{
    animation: slideRightOut 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
}
@keyframes slideRightIn {
    from{
        transform: translateX(100%);
    }
    to{
        transform: translateX(0);
    }
}
@keyframes slideRightOut {
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(-100%);
    }
}

.slide-left-enter-active{
    animation: slideLeftIn 0.5s

}
.slide-left-leave-active{
    animation: slideLeftOut 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
}
@keyframes slideLeftIn {
    from{
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0);
    }
}
@keyframes slideLeftOut {
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(100%);
    }
}
</style>