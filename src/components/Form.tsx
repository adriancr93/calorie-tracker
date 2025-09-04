import { useState, type ChangeEvent, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from "../types"
import { categories } from "../data/categories"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: React.Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
      if(state.activeId) {
        const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
        setActivity(selectedActivity)
      }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => { 
      setActivity({
        ...activity,
        [e.target.id]: e.target.id === "category" ? +e.target.value : (e.target.type === "number" ? +e.target.value : e.target.value) // I did it this way to handle both select and number input types
      })
    }

    const isValidActivity = () => {
        const{ name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      dispatch({
        type: 'save-activity',
        payload: { newActivity: activity }
      })

      setActivity({ ...initialState , id: uuidv4() }) // Reset form and generate new id
    }

    return (
      <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categories:</label>
            <select className="border border-slate-300 p-2 rounded-ls w-full bg-white" id="category" value={activity.category} onChange={handleChange}>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}   
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Activity:</label>
            <input type="text" id="name" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Food, Juice, Salad, Workout, Weights, Bicicle" value={activity.name} onChange={handleChange}/>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calories:</label>
            <input type="number" id="calories" className="border border-slate-300 p-2 rounded-lg" placeholder="Calories. ej. 300 or 500" value={activity.calories} onChange={handleChange}/>
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" value={activity.category === 1 ? 'Save Food' : 'Save Workout'} disabled={!isValidActivity()}/>

      </form>
    )
}
