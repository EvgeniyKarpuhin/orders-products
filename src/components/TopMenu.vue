<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('')

function updateTime() {
    const now = new Date()
    currentTime.value = now.toLocaleString()
}

let interval
onMounted(() => {
    updateTime()
    interval = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(interval))

</script>

<template>
    <header>
        <p></p>
    </header>
</template>