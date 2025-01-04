<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('basecamps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gunung_id')->constrained('gunungs')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->unique();
            $table->string('nama');
            $table->text('alamat')->nullable();
            $table->decimal('harga', 10, 2)->nullable();
            $table->text('deskripsi')->nullable();
            $table->integer('kuota')->nullable();
            $table->string('telepon')->nullable();
            $table->string('gmaps_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basecamps');
    }
};
