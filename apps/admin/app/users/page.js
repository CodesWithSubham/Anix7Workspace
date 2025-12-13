export default async function Users({ searchParams }) {
  return null;
  //   const User = await getUserModel();
  //   const query = await searchParams;
  //   const page = Math.max(0, Number(query.page) || 0);

  //   const limit = Math.max(5, Number(query.page) || 5);
  //   const skip = page ? page * limit : 0;
  //   const allUser = await User.find({}).skip(skip).limit(limit).lean();
  //   // console.log(allUser);

  //   const totalUser = await User.countDocuments();

  //   console.log(allUser[0]);

  //   return (
  //     <>
  //       <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
  //         {allUser.map((user, index) => (
  //           <Link
  //             key={index}
  //             className="flex bg-white/50 dark:bg-neutral-900/50 rounded-xl overflow-hidden hover:bg-black/10 dark:hover:bg-white/5 cursor-pointer text-inherit"
  //             href={`/users/${user.id}`}
  //           >
  //             <Image
  //               src={
  //                 user?.profilePic ??
  //                 "https://i.ibb.co/1JGDTytY/default-Profile-Pic.webp"
  //               }
  //               width={120}
  //               height={120}
  //               alt={`Profile Pic`}
  //               unoptimized
  //             />
  //             <div className="p-2">
  //               <h2 className="text-xl">
  //                 {user.name} ({!user.isVerified && "Not"}{" "}
  //                 Verified)
  //               </h2>
  //               <p className="text-xs">
  //                 {user.email} ({user.id})
  //               </p>
  //               <p>
  //                 Diamond: {user.balance?.diamond || 0} Coin:{" "}
  //                 {user.balance?.coin || 0} Life: {user.balance?.life || 0}{" "}
  //               </p>
  //             </div>
  //           </Link>
  //         ))}
  //       </div>

  //       <div className="w-5/6 mx-auto flex justify-center max-w-md *:w-full mb-20 mt-10">
  //         {page > 0 && <Button href={`?page=${page - 1}`}>Prev</Button>}
  //         {totalUser / limit - 1 > page && (
  //           <Button href={`?page=${page + 1}`}>Next</Button>
  //         )}
  //       </div>
  //     </>
  //   );
}
