<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gunung>
 */
class GunungFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->word(),
            'tinggi' => $this->faker->numberBetween(1000, 5000),
            'lokasi' => $this->faker->city(),
            'gambar' => $this->faker->imageUrl(),
        ];
    }
}
