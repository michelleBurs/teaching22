<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // get all users
    public function index()
    {
        $users = User::with(['image'])->get();
        return $users;
    }


    // create new user
    public function save(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            if (!$this->checkPhoneNumber($request['phoneNumber']) && !$this->checkemail($request['email'])) {
                $user = new User();
                $user->firstName = $request['firstName'];
                $user->lastName = $request['lastName'];
                $user->phoneNumber = $request['phoneNumber'];
                $user->email = $request['email'];
                $user->password = bcrypt($request['password']);
                $user->language = $request['language'];
                $user->education = $request['education'];
                $user->role = $request['role'];

                // save image
                if (isset($request['image']) && $request['image']['url'] != '') {
                    $image = Image::firstOrCreate(['url' => $request['image']['url']]);
                    $user->image()->associate($image['id']);
                } else {
                    //placeholder
                    $image = Image::all()->find(2);
                    $user->image()->associate($image);
                }
                $user->save();

                DB::commit();
                return response()->json($user, 200);
            }
            return response()->json("user already exists!", 420);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving user failed: " . $e->getMessage(), 420);
        }
    }

    public function checkPhoneNumber(string $phoneNumber)
    {
        return User::where('phoneNumber', $phoneNumber)->first();
    }

    public function checkemail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public function update(Request $request, int $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $user = User::with(['image'])->where('id', $id)->first();

            if ($user != null) {
                if ((!$this->checkPhoneNumber($request['phoneNumber']) || ($request['phoneNumber'] == $user['phoneNumber']))
                    && (!$this->checkemail($request['email']) || ($request['email'] == $user['email']))) {
                    $user->update($request->all());
                    // save image
                    if (isset($request['image'])) {
                        $image = Image::firstOrCreate(['url' => $request['image']]);
                        $user->image()->associate($image['id']);
                    } else {
                        //placeholder
                        $image = Image::all()->find(2);
                        $user->image()->associate($image);
                    }
                    $user->save();
                }
                DB::commit();
                return response()->json($user, 200);
            }
            return response()->json("user already exists!", 420);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving user failed: " . $e->getMessage(), 420);
        }
    }

    //delete user
    public function delete(int $id): JsonResponse
    {
        $user = User::where('id', $id)->first();
        if ($user != null) {
            $user->delete();
        } else {
            throw new \Exception("user could not be deleted - it does not exist");
        }
        return response()->json('user(' . $id . ') successfully deleted', 200);
    }
}

