<?php

namespace App\Http\Controllers;

use App\Models\Gunung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GunungController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gunungs = Gunung::all()->map(function ($gunung) {
            $gunung->gambar = Storage::url($gunung->gambar);
            return $gunung;
        });
        return Inertia::render('Gunung/Index', compact('gunungs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Gunung/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'tinggi' => 'required',
            'lokasi' => 'required',
            'gambar' => 'required|file',
        ]);

        $path = $request->file('gambar')->store('gunung');

        Gunung::create([
            ...$request->except('gambar'),
            'gambar' => $path
        ]);

        return redirect()->route('gunung.index')
            ->with('success', 'Gunung created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gunung $gunung)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gunung $gunung)
    {
        $gunung = Gunung::find($gunung->id);
        $gunung->gambar = Storage::url($gunung->gambar);
        return Inertia::render('Gunung/Edit', compact('gunung'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gunung $gunung)
    {
        $request->validate([
            'nama' => 'required',
            'tinggi' => 'required',
            'lokasi' => 'required',
            'deskripsi' => 'required',
        ]);

        if ($request->hasFile('gambar')) {
            Storage::delete($gunung->gambar);
            $path = $request->file('gambar')->store('gunung');
        } else {
            $path = $gunung->gambar;
        }

        $gunung->update([
            ...$request->except('gambar'),
            'gambar' => $path
        ]);

        return redirect()->route('gunung.index')
            ->with('success', 'Gunung updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gunung $gunung)
    {
        Storage::delete($gunung->gambar);
        $gunung->delete();

        return redirect()->route('gunung.index')
            ->with('success', 'Gunung deleted successfully.');
    }
}
