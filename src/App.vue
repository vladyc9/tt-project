<template>
    <div id="app">
        <game-field></game-field>
        <control-panel></control-panel>
    </div>
</template>

<script>
    import GameField from './components/GameField.vue'
    import ControlPanel from './components/ControlPanel.vue'

    export default {
        name: 'App',
        components: {
            GameField,
            ControlPanel
        }
    }
</script>
