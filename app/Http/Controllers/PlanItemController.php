<?php

namespace App\Http\Controllers;

use App\Models\PlanItem;
use Illuminate\Http\Request;

class PlanItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'plan_id' => ['required', 'string'],
            ]);

            $validated['budget'] = 0;
            $validated['created_by'] = auth()->id();

            PlanItem::create($validated);

            return redirect()->route('plan.index')->with('success', 'Item created successfully.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = PlanItem::find($id);
        $request->validate(['name' => 'string|max:255']);
        $item->update($request->all());
        return back(); // or Inertia::location(route(...)) if needed
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        PlanItem::find($id)->delete();
    }
}
