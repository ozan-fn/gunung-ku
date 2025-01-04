<?php

namespace App\Http\Controllers;

use App\Models\Basecamp;
use App\Models\BasecampPhoto;
use Faker\Provider\Base;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BasecampController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $basecamp = Basecamp::with('photos')->where('user_id', $user->id)->first();
        if ($basecamp) {
            $basecamp->photos->map(function ($photo) {
                $photo->path = Storage::url($photo->path);
                return $photo;
            });
        }
        return Inertia::render('Basecamp/Index', compact(['basecamp']));
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Basecamp $basecamp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Basecamp $basecamp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Basecamp $basecamp)
    {
        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'required|image',
            ]);

            $path = $request->file('photo')->store('basecamp');

            BasecampPhoto::create([
                'basecamp_id' => $basecamp->id,
                'path' => $path
            ]);

            return redirect()->back();
        }

        $request->validate([
            'nama' => 'required',
            'alamat' => 'required',
            'harga' => 'required|numeric',
            'deskripsi' => 'required',
            'kuota' => 'required|numeric',
            'telepon' => 'required',
            'gmaps_link' => 'required|url'
        ]);

        $basecamp->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi,
            'kuota' => $request->kuota,
            'telepon' => $request->telepon,
            'gmaps_link' => $request->gmaps_link
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }

    public function deletePhoto($id)
    {
        $photo = BasecampPhoto::find($id);
        Storage::delete($photo->path);
        $photo->delete();

        return redirect()->back();
    }
}
