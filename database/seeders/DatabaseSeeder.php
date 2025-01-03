<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            RoleSeeder::class,
        ]);

        $user = User::firstOrCreate(['email' => 'ozan6825@gmail.com'], [
            'name' => 'Akhmad Fauzan',
            'email' => 'ozan6825@gmail.com',
            'password' => bcrypt('Akhmad6825'),
        ]);

        $user->assignRole('Admin');
    }
}
