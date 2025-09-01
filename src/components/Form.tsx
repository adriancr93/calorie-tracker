import { useState, type ChangeEvent } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"

export default function Form() {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: "",
        calories: 0
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setActivity({
        ...activity,
        [e.target.id]: e.target.value
    })
      
    }

    return (
      <form className="space-y-5 bg-white shadow p-10 rounded-lg">
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
            <label htmlFor="activity" className="font-bold">Activity:</label>
            <input type="text" id="activity" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Food, Juice, Salad, Workout, Weights, Bicicle" value={activity.name} onChange={handleChange}/>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calories:</label>
            <input type="number" id="calories" className="border border-slate-300 p-2 rounded-lg" placeholder="Calories. ej. 300 or 500" value={activity.calories} onChange={handleChange}/>
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer" value={"SAVE FOOD OR SAVE WORKOUT"} />

      </form>
    )
}
