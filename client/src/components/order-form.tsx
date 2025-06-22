import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useCustomization } from "@/hooks/use-customization";
import { useToast } from "@/hooks/use-toast";
import { Guitar, DollarSign } from "lucide-react";

const orderFormSchema = insertOrderSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  shippingAddress: z.string().min(10, "Please provide a complete address"),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export default function OrderForm() {
  const { customization, selectedComponents, totalPrice } = useCustomization();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customizationId: customization?.id || 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shippingAddress: "",
      totalAmount: (parseFloat(totalPrice) + 49).toFixed(2), // Add shipping
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: (data: OrderFormData) =>
      apiRequest("POST", "/api/orders", data),
    onSuccess: () => {
      toast({
        title: "Order Placed Successfully!",
        description: "You'll receive a confirmation email shortly. Estimated delivery: 6-8 weeks.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    },
    onError: (error: any) => {
      toast({
        title: "Order Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: OrderFormData) => {
    if (!customization) {
      toast({
        title: "No Customization Found",
        description: "Please customize your guitar first before placing an order.",
        variant: "destructive",
      });
      return;
    }

    createOrderMutation.mutate({
      ...data,
      customizationId: customization.id,
      totalAmount: (parseFloat(totalPrice) + 49).toFixed(2),
    });
  };

  const basePrice = 899;
  const bodyUpgrade = selectedComponents.body ? parseFloat(selectedComponents.body.price) : 0;
  const neckUpgrade = selectedComponents.neck ? parseFloat(selectedComponents.neck.price) : 0;
  const pickupsUpgrade = selectedComponents.pickups ? parseFloat(selectedComponents.pickups.price) : 0;
  const hardwareUpgrade = selectedComponents.hardware ? parseFloat(selectedComponents.hardware.price) : 0;
  const shipping = 49;
  const finalTotal = basePrice + bodyUpgrade + neckUpgrade + pickupsUpgrade + hardwareUpgrade + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Guitar className="h-6 w-6" />
          Complete Your Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="123 Music Street, Guitar City, GC 12345" 
                      className="h-20 resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order summary */}
            <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-guitar-accent">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Guitar</span>
                  <span className="font-medium">${basePrice}</span>
                </div>
                {bodyUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Body Upgrade</span>
                    <span className="font-medium">${bodyUpgrade}</span>
                  </div>
                )}
                {neckUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Neck Upgrade</span>
                    <span className="font-medium">${neckUpgrade}</span>
                  </div>
                )}
                {pickupsUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Pickups Upgrade</span>
                    <span className="font-medium">${pickupsUpgrade}</span>
                  </div>
                )}
                {hardwareUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Hardware Upgrade</span>
                    <span className="font-medium">${hardwareUpgrade}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-guitar-accent">${finalTotal}</span>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-guitar-accent to-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              disabled={createOrderMutation.isPending}
            >
              {createOrderMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Guitar className="mr-2 h-5 w-5" />
                  Place Order - ${finalTotal}
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              By placing this order, you agree to our Terms of Service and Privacy Policy.
              Estimated delivery: 6-8 weeks.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
