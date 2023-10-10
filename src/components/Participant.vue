<script setup lang="ts">
import type { IWeapon } from '@/views/HomeView.vue';

    defineProps<{
        title:string,
        description:string,
        weapons?: IWeapon[],
        currentSelection?: IWeapon,
        disable?: boolean,
        winner?: boolean,
        looser?: boolean,
        draw?: boolean
    }>()

</script>

<template>
   <div class="participant">
        <div class="participant__description">
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </div>
        <div class="participant__weapons-container">
          <button 
                class="participant__weapon" 
                :disabled="disable"
                :class="`
                    ${currentSelection?.value === item.value?'participant__weapon--selected':''} 
                    ${disable?'disabled':''} 
                    ${currentSelection?.value === item.value && winner?'participant__weapon--winner':''} 
                    ${currentSelection?.value === item.value && looser?'participant__weapon--looser':''}
                    ${currentSelection?.value === item.value && draw?'participant__weapon--draw':''}
                    `"
                v-for="item in weapons"
                @click="$emit('onSelect', item)"
                :key="item.value"
            ><p v-html="item.icon"></p></button>
        </div>
      </div>
</template>

<style scoped>
.participant{
    display: flex;
    flex-direction: column;
    flex: 1;
}
.participant__description{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100px;
}
.participant__weapons-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    gap: 16px;
}
.participant__weapon--selected{
    border: 3px blueviolet solid;
}
.participant__weapon p {
    font-size: 25px;
}
.participant__weapon--winner {
    background-color: green;
}
.participant__weapon--looser {
    background-color: red;
}
.participant__weapon--draw {
    background-color: orange;
}
</style>
