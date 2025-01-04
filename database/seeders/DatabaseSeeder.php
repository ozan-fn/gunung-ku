<?php

namespace Database\Seeders;

use App\Models\Basecamp;
use App\Models\Gunung;
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

        $user1 = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@mail.com',
            'password' => bcrypt('12345678'),
        ]);

        $user2 = User::create([
            'name' => 'User Test',
            'email' => 'user@mail.com',
            'password' => bcrypt('12345678'),
        ]);

        $user3 = User::create([
            'name' => 'Superadmin Test',
            'email' => 'superadmin@mail.com',
            'password' => bcrypt('12345678'),
        ]);

        $user1->syncRoles('admin');
        $user2->syncRoles('user');
        $user3->syncRoles('superadmin');

        Gunung::factory()->count(1)->create();
        Basecamp::factory()->count(1)->create();
    }
}
