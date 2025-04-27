<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Finance;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $categories = Category::whereNull('parent_id')->get();

        $reasons = Category::whereNotNull('parent_id')->get();

        $finances = Finance::with(['source', 'category', 'category.parent', 'created_by', 'updated_by'])->orderBy('created_at')->get()->map(function ($finance) {
            $finance->income = $finance->category && !$finance->category->parent_id ? $finance->amount : "";
            $finance->outcome = $finance->category && $finance->category->parent_id ? $finance->amount : "";
            $finance->is_didik = $finance->source && $finance->source->email === 'mbahcip00@gmail.com';
            $finance->is_suel = $finance->source && $finance->source->email === 'dwieloknuraini773@gmail.com';
            $finance->reason_id = $finance->category->parent_id ? $finance->category_id : null;
            return $finance;
        });

        return Inertia::render('finance/index', [
            'items' => $finances,
            'users' => $users,
            'categories' => $categories,
            'reasons' => $reasons,
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
            'date' => ['required', 'date'],
            'amount' => ['nullable', 'numeric'],
            'source_id' => ['required', 'exists:users,id'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'reason_id' => ['nullable', 'exists:categories,id'],
        ]);

        if ($validated['reason_id']) {
            $validated['category_id'] = $validated['reason_id'];
        }

        $validated['created_by'] = auth()->id();

        Finance::create($validated);

        return redirect()->route('finance.index')->with('success', 'Finance record created successfully.');
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
        $finance = Finance::find($id);

        $validated = $request->validate([
            'date' => ['required', 'date'],
            'amount' => ['nullable', 'numeric'],
            'source_id' => ['required', 'exists:users,id'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'reason_id' => ['nullable', 'exists:categories,id'],
        ]);

        if ($validated['reason_id']) {
            $validated['category_id'] = $validated['reason_id'];
        }

        $validated['updated_by'] = auth()->id();

        $finance->update($validated);

        return redirect()->route('finance.index')->with('success', 'Finance record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Finance::find($id)->delete();
    }
}
