<?php

namespace Database\Factories;

use App\Models\Basecamp;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Basecamp>
 */
class BasecampFactory extends Factory
{
    protected $model = Basecamp::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'gunung_id' => 1,
            'nama' => $this->faker->word(),
        ];
    }
}
