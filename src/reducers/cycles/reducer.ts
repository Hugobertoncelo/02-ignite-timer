import { produce } from 'immer'

import { ActionTypes } from "./action"

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finichedDate?: Date
}

interface CycleAction {
    type: keyof typeof ActionTypes
    payload: {
        newCycle: Cycle
    }
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: CycleAction) {
    switch(action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
           return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0) {
                return state 
            }

            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {  
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0) {
                return state 
            }

            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finichedDate = new Date()
            })
        }
        default:
            return state
    }
}