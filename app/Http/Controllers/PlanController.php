<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\PlanUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
            $query->whereIn('visibility', ['private', 'shared_users'])
                ->where('created_by', $user->id); // Own private/shared_users plans
        })
            ->orWhere('visibility', 'shared_all') // Publicly shared plans
            ->orWhere(function ($query) use ($user) {
                $query->where('visibility', 'shared_users')
                    ->whereHas('sharedUsers', function ($q) use ($user) {
                        $q->where('user_id', $user->id); // Specifically shared with user
                    });
            })
            ->with(['owner', 'sharedUsers', 'items']) // Load relationships if needed
            ->orderBy('created_at', 'desc')
            ->get();

        $users = User::where('id', '!=', $user->id)->get();

        return Inertia::render('plan/index', [
            'items' => $plans,
            'users' => $users
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
            'shared_user_ids' => 'array' . ($request['visibility'] === 'shared_users' ? '|min:1' : ''),
        ]);

        $plan = Plan::create([
            'name' => $validated['name'],
            'created_by' => auth()->id(),
            'visibility' => $validated['visibility'],
            'estimation_date' => $validated['estimation_date'] ?? null,
            'is_realized' => $validated['is_realized'] ?? false,
        ]);

        // If shared_users, attach users
        if ($plan->visibility === 'shared_users') {
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'visibility' => 'in:private,shared_all,shared_users',
            'estimation_date' => 'nullable|date',
            'is_realized' => 'boolean',
            'shared_user_ids' => 'array' . ($request['visibility'] === 'shared_users' ? '|min:1' : ''),
        ]);

        $plan = Plan::find($id);
        $plan->update([
            'name' => $validated['name'],
            'visibility' => $validated['visibility'],
            'estimation_date' => $validated['estimation_date'] ?? null,
            'is_realized' => $validated['is_realized'] ?? false,
        ]);

        // If shared_users, attach users
        if ($plan->visibility === 'shared_users') {
            $plan->sharedUsers()->sync($validated['shared_user_ids']);
        } else {
            $plan->sharedUsers()->detach();
        }

        return redirect()->route('plan.index')->with('success', 'Plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Plan::find($id)->delete();
    }
}
