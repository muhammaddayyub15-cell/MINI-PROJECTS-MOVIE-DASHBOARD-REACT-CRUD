<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Admin: List Users with Search
    public function index(Request $request)
    {
        $query = User::query();

        // 🔍 Search
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest()->paginate(10)
        ]);
    }

    // Admin: Show User Detail
    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => User::findOrFail($id)
        ]);
    }

    // Admin: Update User (including role & status)
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|min:6',
            'role' => 'sometimes|in:user,admin',
            'is_active' => 'sometimes|boolean'
        ]);

        $data = $request->only([
            'name',
            'email',
            'role',
            'is_active'
        ]);

        // ⚠️ JANGAN HASH kalau pakai mutator di model
        if ($request->password) {
            $data['password'] = $request->password;
        }

        $user->update($data);

        return response()->json([
            'success' => true,
            'message' => 'User updated',
            'data' => $user
        ]);
    }

    // Admin: Suspend User
    public function suspend($id)
    {
        $user = User::findOrFail($id);

        $user->update([
            'is_active' => false
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User suspended'
        ]);
    }

    // Admin: Activate User
    public function activate($id)
    {
        $user = User::findOrFail($id);

        $user->update([
            'is_active' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User activated'
        ]);
    }

    // Admin: Delete User (Except Self)
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        // ❗Jangan biarkan admin hapus dirinya sendiri
        if (auth()->id() == $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete yourself'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted'
        ]);
    }

    // User: Get Own Profile
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    }

    // User: Update Own Profile (name, email)
    public function updateSelf(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id
        ]);

        $user->update($request->only([
            'name',
            'email'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Profile updated',
            'data' => $user
        ]);
    }

    // User: Delete Own Account
    public function deleteSelf(Request $request)
    {
        $user = $request->user();

        $user->tokens()->delete(); // Revoke token
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Account deleted'
        ]);
    }
}