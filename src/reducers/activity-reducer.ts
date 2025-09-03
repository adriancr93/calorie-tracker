import type { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activityId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } }

export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id'] 
}

export const initialState : ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
    if(action.type === 'save-activity') { //This code handle the logic to update the state with a new activity
        let updateActivities : Activity[] = []
        if(state.activeId){
            updateActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        } else {
            updateActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activityId') { //This code handle the logic to set the activeId in the state
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity') { //This code handle the logic to delete an activity from the state
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    return state
}