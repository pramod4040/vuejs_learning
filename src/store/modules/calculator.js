const calculator = {
    namespaced: true,
    state: {
        displayElements: [
            {id: 1, displayName: 0, value: 0, type: 'operand'},
            {id: 2, displayName: 1, value: 1, type: 'operand'},
            {id: 3, displayName: 2, value: 2, type: 'operand'},
            {id: 4, displayName: '+', value: 'add', type: 'operator'},
            {id: 5, displayName: 3, value: 3, type: 'operand'},
            {id: 6, displayName: 4, value: 4, type: 'operand'},
            {id: 7, displayName: 5, value: 5, type: 'operand'},
            {id: 8, displayName: '-', value: 'subtract', type: 'operator'},
            {id: 9, displayName: 6, value: 6, type: 'operand'},
            {id: 10, displayName:7, value: 7, type: 'operand'},
            {id: 11, displayName:8, value: 8, type: 'operand'},
            {id: 12, displayName:'*', value: 'multiply', type: 'operator'},
            {id: 13, displayName: 9, value: 9, type: 'operand'},
            {id: 14, displayName: 'CLEAR', value: 'clear', type: 'process'},
            {id: 15, displayName: '/', value: 'divide', type: 'operator'},
            {id: 16, displayName: '=', value: 'result', type: 'process'}
        ],
        displaySectionCalculator: 'CALCULATE: ',
        operator: '',
        firstOperand: '',
        secondOperand: '',
        result: null,
        // total stage 'firstOperand','operator', 'secondOperand', 'process'
        stage:'firstOperand',
    },
    mutations: {
        SET_OPERATOR (state, data) {
            state.operator = data;
        },
        RESET_OPERATOR (state){
            state.operator = ''
        },
        SET_FIRST_OPERAND (state, data) {
            state.firstOperand = state.firstOperand + String(data)   
        },
        RESET_FIRST_OPERAND (state){
            state.firstOperand = '';
        },
        SET_SECOND_OPERAND (state, data) {
            state.secondOperand = state.secondOperand + String(data)   
        },
        RESET_SECOND_OPERAND (state){
            state.secondOperand = '';
        },
        APPEND_DISPLAY_SECTION_CALCULATOR (state, data) {
            state.displaySectionCalculator = state.displaySectionCalculator + String(data)
        },
        RESET_DISPLAY_SECTION_CALCULATOR(state) {
            state.displaySectionCalculator = ''
        },
        SET_RESULT (state, data){
            state.result = data;
        },
        RESET_RESULT (state) {
            state.result = null;
        },
        CHANGE_STAGE (state, data) {
            state.stage = data;
        }

    },

    actions: {
        operation ({state, commit}) {
            if (state.firstOperand !== '' && state.firstOperand !== '' && state.operator !== ''){
                var result = null
                var first = parseFloat(state.firstOperand)
                var second = parseFloat(state.secondOperand)
                switch (state.operator){
                    case "add":
                        result = first + second
                        break;
                    case "subtract":
                        result = first - second
                        break;
                    case "multiply":
                        result = first * second
                        break;
                    case "divide":
                        result = first / second
                        break;
                    default:
                        result = 0

                }
                if (result !== null){
                    commit('SET_RESULT', result)
                }
            }else{
                commit('SET_RESULT', 'ERROR')
            }
        },

        operandHandler (context, data) {
            if (context.state.stage == 'firstOperand'){
                context.commit('SET_FIRST_OPERAND', data.value)

                //display in calculator head
                context.commit('APPEND_DISPLAY_SECTION_CALCULATOR', data.value)
            }

            if (context.state.stage == 'secondOperand'){
                context.commit('SET_SECOND_OPERAND', data.value)

                //display in calculator head
                context.commit('APPEND_DISPLAY_SECTION_CALCULATOR', data.value)
            }
        },

        operatorHandler (context, data) {
            if (context.state.stage == 'operator'){
                context.commit('SET_OPERATOR', data.value)
                context.commit('APPEND_DISPLAY_SECTION_CALCULATOR', ` ${data.displayName} `)
                context.commit('CHANGE_STAGE', 'secondOperand')
            }
        },

        processHandler (context, data){
            context.commit('CHANGE_STAGE', 'process')
            context.dispatch('operation');
            if (context.state.result !== null)
            {
                context.commit('APPEND_DISPLAY_SECTION_CALCULATOR', ` = ${context.state.result}`)

            }else{
                context.commit('APPEND_DISPLAY_SECTION_CALCULATOR', 'ERROR')
            }

        },

        clearAll (context) {
            context.commit('RESET_DISPLAY_SECTION_CALCULATOR')
            context.commit('RESET_OPERATOR')
            context.commit('RESET_SECOND_OPERAND')
            context.commit('RESET_FIRST_OPERAND')
            context.commit('CHANGE_STAGE', 'firstOperand')
            context.commit('APPEND_DISPLAY_SECTION_CALCULATOR', 'CALCULATE: ')
            context.commit('RESET_RESULT')
        }
    }
}

export default calculator