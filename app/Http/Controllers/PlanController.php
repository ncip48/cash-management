<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user(); // or auth()->user()

        $plans = Plan::where(function ($query) use ($user) {
            $query->where('created_by', $user->id) // Private plans (your own)
                ->where('visibility', 'private');
        })
            ->orWhere('visibility', 'shared_all') // Plans shared with all users
            ->orWhere(function ($query) use ($user) {
                $query->where('visibility', 'shared_users')
                    ->whereHas('sharedUsers', function ($q) use ($user) {
                        $q->where('user_id', $user->id); // Shared specifically with you
                    });
            })
            ->with(['owner', 'sharedUsers', 'items']) // Optional: load relations
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('plan/index', [
            'items' => $plans,
        ]);
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
        $validated = $request->validate([
            'name' => 'required|string',
            'visibility' => 'required|in:private,shared_all,shared_users',
            'estimation_date' => 'nullable|date',
            'is_realized' => 'boolean',
            'shared_user_ids' => 'array',
        ]);

        $plan = Plan::create([
            'name' => $validated['name'],
            'user_id' => auth()->id(),
            'visibility' => $validated['visibility'],
            'estimation_date' => $validated['estimation_date'] ?? null,
            'is_realized' => $validated['is_realized'] ?? false,
        ]);

        // If shared_users, attach users
        if ($plan->visibility === 'shared_users' && !empty($validated['shared_user_ids'])) {
            $plan->sharedUsers()->sync($validated['shared_user_ids']);
        }

        return redirect()->route('plan.index')->with('success', 'Plan created successfully.');
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
        $item = Plan::find($id);
        $request->validate(['name' => 'required|string|max:255']);
        $item->update(['name' => $request->name]);
        return back(); // or Inertia::location(route(...)) if needed
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
